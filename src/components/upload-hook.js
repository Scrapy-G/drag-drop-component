import { useState, useEffect } from "react";
import axios from 'axios';

export function useUpload(uri, file) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!uri || !file) return;
        const fileData = new FormData();
        fileData.append("file", file);
        // axios.post(uri, 'smething');

        axios.post(uri, fileData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: e => setProgress(Math.floor(e.loaded * 100 /e.total))
        })
        .then(res => res.data)
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
        
    }, [uri, file]);
    
    return {
        loading,
        progress,
        data,
        error
    };
}