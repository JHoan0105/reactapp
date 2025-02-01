/*                                                                                                                                                                                                                                                                                                                             
=========================================================
* Provisioning Portal - v1.0.0
=========================================================
* Copyright � 2024 Guardian Mobility All Rights Reserved
=========================================================
*/

// Imports
import axios from 'axios';
import getAccountInfo from 'services/account/getAccountInfo'

// Default function
export default async function getAllAccountNumber(n) {
  const controller = new AbortController();
  const jwtToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
  const route = `${process.env.REACT_APP_PROVISIONING_PORTAL_API_URL}/AllOrganizationAccounts`;
  const account = getAccountInfo();

  try {
    if (!account?.isGuardianAdmin) {
      window.location.href = '/error'
      return;
    }
    console.log(route);
    const response = await axios.get(route,
      {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-GB,en-US,q=0.8,en;q=0.6",
          "Authorization": `Bearer ${jwtToken}`
        },
      });
    // Check response status
    switch (response.status) {
      case 201:
      case 200:
        return response.data;
      default:
        return [];
    }
  } catch (error) {

    // Handle errors
    if (error.response && (error.response.status === 401)) {
      if (error.response.data === "JWT authorization error") {
        console.error("JWT authorization error:", error.response.data);
        //Delete token cookie 
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = '/login';
      }
      if (error.response.data?.message === 'token expired') {
        //Delete token cookie 
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = '/login';
      }
      if (error?.response?.data === 'Unauthorized') {
        window.location.href = '/admin/users/view'
      }
    } else {
      console.error("Other error:", error.message);
    }
    return false;
  }
}