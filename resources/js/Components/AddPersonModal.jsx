import React, {useState, useEffect} from "react";
import {usePage} from "@inertiajs/react";

const initialValue = {
    name: "",
    surname: "",
    south_african_id_number: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
    language: "",
    interests: [], // Still an array for storing interests
};

const AddPersonModal = ({
                            isOpen,
                            onClose,
                            onAdd,
                            editPerson: person,
                            onEdit,
                        }) => {
    const {errors} = usePage().props

    const [formData, setFormData] = useState(initialValue);
    const [interestsInput, setInterestsInput] = useState(""); // New state for interests input as text
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!!person) {
            setFormData({
                name: person.name || "",
                surname: person.surname || "",
                south_african_id_number: person.south_african_id_number || "",
                mobile_number: person.mobile_number || "",
                email: person.email || "",
                date_of_birth: person.date_of_birth || "",
                language: person.language || "",
                interests: person.interests || [],
            });
            setInterestsInput(person.interests?.join(", ") || ""); // Populate input field with comma-separated interests
        }
        return () => {
            setFormData(initialValue);
            setInterestsInput(""); // Reset the interests input on modal close
        };
    }, [person]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // Function to handle interests input
    const handleInterestsChange = (e) => {
        setInterestsInput(e.target.value); // Update the raw text input
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Split interests input into an array and set it in formData
        const interestsArray = interestsInput
            .split(",")
            .map((interest) => interest.trim())
            .filter(Boolean); // Remove empty strings
        setFormData({...formData, interests: interestsArray});

        if (!!person) {
            onEdit(person?.id, {...formData, interests: interestsArray});
        } else {
            onAdd({...formData, interests: interestsArray});
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            />
            <div
                className="bg-white p-6 rounded-lg shadow-lg z-10"
                style={{width: "500px"}}
            >
                <h2 className="text-xl mb-4">
                    {person ? "Edit Person" : "Add Person"}
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-6 overflow-y-auto"
                >
                    {/* Name */}
                    <div className="col-span-1">
                        <label className="block font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-48 rounded-md border-gray-300 shadow-sm ${
                                errors.name && "border-red-500"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500">{errors.name}</p>
                        )}
                    </div>
                    {/* Surname */}
                    <div className="col-span-1">
                        <label className="block font-medium text-gray-700">
                            Surname
                        </label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className={`mt-1 block w-48 rounded-md border-gray-300 shadow-sm ${
                                errors.surname && "border-red-500"
                            }`}
                        />
                        {errors.surname && (
                            <p className="text-red-500">{errors.surname}</p>
                        )}
                    </div>
                    {/* South African ID Number */}
                    <div className="col-span-1">
                        <label className="block font-medium text-gray-700">
                            South African ID Number
                        </label>
                        <input
                            type="text"
                            name="south_african_id_number"
                            value={formData.south_african_id_number}
                            onChange={handleChange}
                            className={`mt-1 block w-48 rounded-md border-gray-300 shadow-sm ${
                                errors.south_african_id_number &&
                                "border-red-500"
                            }`}
                        />
                        {errors.south_african_id_number && (
                            <p className="text-red-500">
                                {errors.south_african_id_number}
                            </p>
                        )}
                    </div>
                    {/* Mobile Number */}
                    <div className="col-span-1">
                        <label className="block font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            name="mobile_number"
                            value={formData.mobile_number}
                            onChange={handleChange}
                            className={`mt-1 block w-48 rounded-md border-gray-300 shadow-sm ${
                                errors.mobile_number && "border-red-500"
                            }`}
                        />
                        {errors.mobile_number && (
                            <p className="text-red-500">
                                {errors.mobile_number}
                            </p>
                        )}
                    </div>
                    {/* Email */}
                    <div className="col-span-1">
                        <label className="block font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-48 rounded-md border-gray-300 shadow-sm ${
                                errors.email && "border-red-500"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email}</p>
                        )}
                    </div>
                    {/* Date of Birth */}
                    <div className="col-span-1">
                        <label className="block font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className={`mt-1 block w-48 rounded-md border-gray-300 shadow-sm ${
                                errors.date_of_birth && "border-red-500"
                            }`}
                        />
                        {errors.date_of_birth && (
                            <p className="text-red-500">
                                {errors.date_of_birth}
                            </p>
                        )}
                    </div>
                    {/* Language */}
                    <div className="col-span-2">
                        <label className="block font-medium text-gray-700">
                            Language
                        </label>
                        <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                errors.language && "border-red-500"
                            }`}
                        />
                        {errors.language && (
                            <p className="text-red-500">{errors.language}</p>
                        )}
                    </div>
                    {/* Interests */}
                    <div className="col-span-2">
                        <label className="block font-medium text-gray-700">
                            Interests (comma-separated)
                        </label>
                        <input
                            type="text"
                            name="interests"
                            value={interestsInput} // Use the new interests input state
                            onChange={handleInterestsChange} // Update as the user types
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                errors.interests && "border-red-500"
                            }`}
                        />
                        {errors.interests && (
                            <p className="text-red-500">{errors.interests}</p>
                        )}
                    </div>
                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            {person ? "Update Person" : "Add Person"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPersonModal;
