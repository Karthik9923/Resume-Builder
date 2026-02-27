import React from 'react'

const Register = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="space-y-4">
        <input className="w-full border p-2 rounded" type="text" placeholder="Name" />
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register