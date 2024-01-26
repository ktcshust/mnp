import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";  // Import Link from react-router-dom

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // Kiểm tra xem người dùng có phải là admin hay không
      if (email === "admin@example.com" && password === "123") {
        // Nếu là admin, chuyển hướng sang trang FashionManager
        navigate("/fashionmanager");
      } else {
        // Nếu không phải là admin, sử dụng getAuth để đăng nhập thông thường
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        
        // Chuyển hướng sang trang Fashion sau khi đăng nhập thành công
        navigate("/fashion");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      
      {/* Add the link to the Sign Up page */}
      <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>
    </div>
  );
};

export default SignIn;






