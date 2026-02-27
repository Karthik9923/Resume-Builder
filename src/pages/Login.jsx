import React from 'react'

const Login = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4">
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login