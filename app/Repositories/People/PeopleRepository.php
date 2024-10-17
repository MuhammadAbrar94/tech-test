<?php

namespace App\Repositories\People;

use App\Models\People;
use App\Repositories\Base\BaseRepository;
use App\Repositories\People\Interfaces\PeopleRepositoryInterface;

class PeopleRepository extends BaseRepository implements PeopleRepositoryInterface
{
    public function __construct(People $people)
    {
        parent::__construct($people);
    }
}
