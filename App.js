// src/App.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";  // Use ./ if firebase.js is in the src folder
import { auth } from "./firebase";// Adjusted import to match firebase.js location
import TaskManager from "./components/TaskManager";
import Auth from "./components/Auth";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {user ? <TaskManager /> : <Auth />}
        </div>
    );
};

export default App;
