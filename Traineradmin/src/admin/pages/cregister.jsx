// import React, { useState } from 'react';
// import { UserPlus, ShieldCheck, FileText } from 'lucide-react';

// const Users = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     college: '',
//     branch: '',
//     year: '2026',
//     cgpa: '',
//     coupon: ''
//   });

//   const [users, setUsers] = useState([]);

//   const TARGET_GOAL = 20;
//   const registrationPercentage = Math.min((users.length / TARGET_GOAL) * 100, 100);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.phone) {
//       return alert("Please fill Name, Email, and Phone!");
//     }

//     try {
//       const response = await fetch("http://10.146.66.5:8000/api/register_student/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUsers([data, ...users]);
//         alert("Student Registered ✅");

//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           college: '',
//           branch: '',
//           year: '2026',
//           cgpa: '',
//           coupon: ''
//         });

//       } else {
//         alert("Error: " + JSON.stringify(data));
//       }

//     } catch (err) {
//       console.log(err);
//       alert("Server error ❌");
//     }
//   };

//   return (
//     <div className="space-y-8 max-w-7xl mx-auto p-4">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-6">
//         <div className="flex items-center gap-4">
//           <div className="bg-blue-600 p-4 rounded-2xl">
//             <ShieldCheck className="text-white" size={28} />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold">Admin Elite</h1>
//             <p className="text-gray-500 text-sm">Student Registry</p>
//           </div>
//         </div>

//         <div>
//           <p className="font-bold">{users.length} Records</p>
//           <div className="w-48 bg-gray-200 h-2 rounded">
//             <div
//               className="bg-blue-600 h-2 rounded"
//               style={{ width: `${registrationPercentage}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
//           <h2 className="font-bold text-lg flex items-center gap-2">
//             <UserPlus size={18}/> New Enrollment
//           </h2>

//           {/* ✅ LABELS ADDED */}
//           <div>
//             <label className="text-sm font-semibold">Full Name</label>
//             <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded"/>
//           </div>

//           <div>
//             <label className="text-sm font-semibold">Email</label>
//             <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded"/>
//           </div>

//           <div>
//             <label className="text-sm font-semibold">Phone</label>
//             <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded"/>
//           </div>

//           <div>
//             <label className="text-sm font-semibold">College</label>
//             <input name="college" value={formData.college} onChange={handleChange} placeholder="College" className="w-full border p-2 rounded"/>
//           </div>

//           <div>
//             <label className="text-sm font-semibold">Branch</label>
//             <input name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" className="w-full border p-2 rounded"/>
//           </div>

//           <div>
//             <label className="text-sm font-semibold">CGPA</label>
//             <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" className="w-full border p-2 rounded"/>
//           </div>

//           <div>
//             <label className="text-sm font-semibold">Year</label>
//             <select name="year" value={formData.year} onChange={handleChange} className="w-full border p-2 rounded">
//               <option>2024</option>
//               <option>2025</option>
//               <option>2026</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-sm font-semibold">Coupon</label>
//             <input name="coupon" value={formData.coupon} onChange={handleChange} placeholder="Coupon" className="w-full border p-2 rounded"/>
//           </div>

//           <button className="bg-blue-600 text-white w-full py-2 rounded">
//             Register Student
//           </button>
//         </form>

//         {/* TABLE (LOCAL ONLY) */}
//         <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
//           <h3 className="font-bold mb-4 flex items-center gap-2">
//             <FileText size={18}/> Students (Local)
//           </h3>

//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b">
//                 <th>Name</th>
//                 <th>CGPA</th>
//                 <th>Branch</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map(user => (
//                 <tr key={user.id} className="border-b">
//                   <td>
//                     <div className="font-bold">{user.name}</div>
//                     <div className="text-xs text-gray-500">{user.email}</div>
//                   </td>
//                   <td>{user.cgpa}</td>
//                   <td>{user.branch}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Users;