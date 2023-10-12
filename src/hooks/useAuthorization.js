
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const useAuthorization = () => {
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const signOutUser = () => {
				setUser({});
	}

	return {
		user,
		setUser,
		signOutUser,
	};
};

export default  useAuthorization;