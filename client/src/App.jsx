import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserAuth from './components/UserAuth';
import Singin from './components/Singin';
import Editor from './components/Editor';
import { Route, Routes } from "react-router-dom";

const App = () => {   

    return (
        <>

        <Navbar />
        
        <Routes>
            <Route>
                <Route path="signup" element={<UserAuth />} />
                <Route path="signin" element={<Singin  />} />
                <Route path="Editor" element={<Editor  />} />
            </Route>
        </Routes>
        
        <Footer />
        </>
    );
}

export default App;
