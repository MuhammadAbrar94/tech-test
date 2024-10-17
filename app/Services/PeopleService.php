<?php

namespace App\Services;

use App\Repositories\People\PeopleRepository;

class PeopleService
{
    protected $peopleRepository;

    public function __construct(PeopleRepository $peopleRepository)
    {
        $this->peopleRepository = $peopleRepository;
    }

    public function getAllPeople($userId)
    {
        return $this->peopleRepository->findBy(['user_id' => $userId]);
    }

    public function createPerson(array $data)
    {
        return $this->peopleRepository->create($data);
    }

    public function getPerson($id, $userId)
    {
        return $this->peopleRepository->findOneBy(['id', $id, 'user_id', $userId]);
    }

    public function updatePerson($id, array $data, $userId)
    {
        return $this->peopleRepository->update($data, $id);
    }

    public function deletePerson($id, $userId)
    {
       return $this->peopleRepository->delete($id);
    }
}
