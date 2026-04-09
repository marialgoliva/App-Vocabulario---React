import React from "react";
import "./Alert.css";

export default function Alert({type, message}) {
    
        return (
                <div className={type}>
                    <p>{message}</p>
                </div>
            )
        
    
}