import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ContactProvider } from "./providers/contactProvider";
import { ClientProvider } from "./providers/clientProvier";

function App() {
    return (
        <div>
            <ClientProvider>
                <ContactProvider>
                    <AppRoutes />
                </ContactProvider>
            </ClientProvider>
        </div>
    );
}

export default App;
