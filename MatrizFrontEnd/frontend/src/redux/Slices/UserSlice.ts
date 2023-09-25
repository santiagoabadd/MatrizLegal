import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/GlobalInterfaces";
import axios from "axios";

interface UserSliceState {
  loggedIn: User | undefined;
  username: string;
  token: string;
  fromRegister: boolean;
  error: boolean;
}

interface LoginBody {
  username: string;
  password: string;
}

interface VerifyUserBody {
  email: string;
  phone: string;
  username: string;
}

export const verifyUsername = createAsyncThunk(
  "user/username",
  async (body: VerifyUserBody, thunkAPI) => {
    try {
      const req = await axios.post("http://localhost:8080/auth/find", body);
      return req.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState: UserSliceState = {
  loggedIn: undefined,
  username: "",
  token: "",
  fromRegister: false,
  error: false,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (body: LoginBody, thunkApi) => {
    try {
      const req = await axios.post("http://localhost:8080/auth/login", body);
      return req.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFromRegister(state, action: PayloadAction<boolean>) {
      state = {
        ...state,
        fromRegister: action.payload,
      };

      return state;
    },
    resetUsername(state) {
      state = {
        ...state,
        username: "",
      };

      return state;
    },
    setToken(state, action: PayloadAction<string>) {
      state = {
        ...state,
        token: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state = {
        ...state,
        loggedIn: {
          userId: action.payload.user.userId,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          email: action.payload.user.email,
          phone: action.payload.user.phone,
          username: action.payload.user.username,
          bio: action.payload.user.bio,
          nickname: action.payload.user.nickname,
          profilePicture: action.payload.user.profilePicture,
          bannerPicture: action.payload.user.bannerPicture,
        },
        token: action.payload.token,
      };
      return state;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state = {
        ...state,
        error: false,
      };
      return state;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });

    builder.addCase(verifyUsername.fulfilled, (state, action) => {
      state = {
        ...state,
        username: action.payload,
      };

      return state;
    });

    builder.addCase(verifyUsername.pending, (state, action) => {
      state = {
        ...state,
        error: false,
      };
      return state;
    });

    builder.addCase(verifyUsername.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };

      return state;
    });
  },
});

export const { setFromRegister, resetUsername, setToken } = UserSlice.actions;

export default UserSlice.reducer;
