import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./components/Routing/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0E5E",
    },
    secondary: {
      main: "#FF4750",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <AllRoutes />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnHover
            theme="colored"
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
