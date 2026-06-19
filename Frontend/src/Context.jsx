import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [burger, setBurger] = useState(null);

	return (
		<Context.Provider value={{ user, setUser, burger, setBurger }}>
			{children}
		</Context.Provider>
	);
};