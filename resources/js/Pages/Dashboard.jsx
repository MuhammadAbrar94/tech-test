import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router, usePage} from "@inertiajs/react";
import People from "./People";
import { useState } from "react";
import AddPersonModal from "../Components/AddPersonModal";

export default function Dashboard() {
    const {people} = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPerson, setEditPerson] = useState(null);

    const handleAddPerson = (newPerson) => {
        router.post('/people', newPerson)
    };

    const handleUpdate = (id, formData) => {
        router.put(`/people/${id}`, formData)
    };
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this person?")) {
            router.delete(`/people/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        People Management
                    </h2>
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={() => {
                            setIsModalOpen(true);
                            setEditPerson(null);
                        }}
                    >
                        Add Person
                    </button>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                        {/* <div className="p-6 text-gray-900">
                            You're logged in!
                        </div> */}
                        <People
                            setEditPerson={setEditPerson}
                            people={people}
                            onDelete={handleDelete}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </div>
                </div>
            </div>

            <AddPersonModal
                editPerson={editPerson}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddPerson}
                onEdit={handleUpdate}
                // setIsModalOpen={setIsModalOpen}
            />
        </AuthenticatedLayout>
    );
}
