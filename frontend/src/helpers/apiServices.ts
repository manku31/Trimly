import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import Swal from "sweetalert2";

export class ApiServices {
  private static baseUrl = import.meta.env.VITE_API_BASE_URL;
  private static defaultTimeout = 10000; // 10 seconds

  private static getAuthHeader() {
    const token = localStorage.getItem("auth_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private static async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...(options?.headers || {}),
      };

      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        timeout: options?.timeout || this.defaultTimeout,
        ...(method === "GET" ? { params: data } : { data }),
        ...options,
      };

      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      const statusCode = error.response?.status;
      console.error(`API ${method} Error:`, {
        endpoint,
        statusCode,
        message: errorMessage,
      });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        footer: '<a href="#">Please use different credentials to sign up.</a>',
      });
      throw {
        message: errorMessage,
        statusCode,
        originalError: error,
      };
    }
  }

  // HTTP Method wrappers
  public static async getMiddlerware<T>(
    endpoint: string,
    params?: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("GET", endpoint, params, options);
  }

  public static async postMiddlerware<T>(
    endpoint: string,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, options);
  }
}
