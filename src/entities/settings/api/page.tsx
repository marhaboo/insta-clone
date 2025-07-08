import { axiosRequest } from "@/shared/utils/axiosRequest";
import {createAsyncThunk } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";
interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
  sid?: string;
}

export const deleteAccount = createAsyncThunk(
  'settings/deleteAccount',
  async (id: string) => {
    try {
      console.log(id);
      const { data } = await axiosRequest.delete(`/User/delete-user?userId=${id}`);
      return data;
    } catch (error) {
        console.log(error);
        console.log(id);
    }
  }
);


export const editAccount = createAsyncThunk(
  'settings/editAccount', 
  async(obj: CustomJwtPayload) => {
    try {
      const { data } = await axiosRequest.put(`/UserProfile/update-user-profile`, obj);
      return data;
    } catch (error) {
      console.log(obj);
      console.log(error);
    }
  }
)
export const securitySettings = createAsyncThunk(
  'settings/securitySettings',
  async(obj: {currentPassword: string, newPassword: string, confirmPassword: string}) => {
    try {
      const { data } = await axiosRequest.put(`/Account/ChangePassword?OldPassword=${obj.currentPassword}&Password=${obj.newPassword}&ConfirmPassword=${obj.confirmPassword}`);
      console.log('Success');
      alert('Password changed successfully');
      return data;
    } catch (error) {
      console.log(error);
      alert('Error of password change')
    }
  }
)