<?php

namespace App\Repositories\Base\Interfaces;

interface BaseRepositoryInterface
{
    /**
     * @param  array  $attributes
     * @return mixed
     */
    public function insert(array $attributes);

    /**
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes);

    /**
     * @param  array  $attributes
     * @param  int  $id
     * @return mixed
     */
    public function update(array $attributes, int $id);

    /**
     * @param  array  $columns
     * @param  array  $with
     * @param  string  $orderBy
     * @param  string  $sortBy
     * @return mixed
     */
    public function all(array $columns = ['*'], array $with = [], string $orderBy = 'id', string $sortBy = 'desc');

    /**
     * @param array $data
     * @param array $with
     * @param string $orderBy
     * @param string $sortBy
     * @return mixed
     */
    public function findBy(array $data, array $with = [], string $orderBy = 'id', string $sortBy = 'asc');

    /**
     * @param array $data
     * @param array $with
     * @param array $withCount
     * @return mixed
     */
    public function findOneBy(array $data, array $with = [], array $withCount = []);

    /**
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * @return mixed
     */
    public function newModelInstance();
}
