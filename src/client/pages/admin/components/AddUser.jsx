import React, { useState, Fragment } from 'react';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nik, setNik] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    nik,
                    name,
                    address,
                    email,
                    phone,
                }),
            });

            const data = await response.json();
            console.log(data);
            window.location = "/admin/user";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-4">Tambah Staf</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Kirim</button>
                </form>
            </div>
        </Fragment>
    );
};

export default AddUser;
