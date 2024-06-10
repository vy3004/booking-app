import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLoggedIn, showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign out successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-2xl text-white font-bold tracking-tighter">
          <Link to="/">Booking.com</Link>
        </span>

        <div className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="text-white font-medium px-3 py-2 rounded-md hover:bg-blue-500/95"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="text-white font-medium px-3 py-2 rounded-md hover:bg-blue-500/95"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <button
                className="font-medium text-blue-800 bg-white px-3 rounded-md hover:bg-gray-100"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="flex items-center font-medium text-blue-800 bg-white px-3 rounded-md hover:bg-gray-100"
              >
                Register
              </Link>
              <Link
                to="/sign-in"
                className="flex items-center font-medium text-blue-800 bg-white px-3 rounded-md hover:bg-gray-100"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
