<?php

namespace App\Entities;

use App\Models\User;

use Illuminate\Contracts\Support\Arrayable;

class Education implements Arrayable
{
    protected $id;
    protected $name;
    protected $description;
    protected $startedDate;
    protected $endedDate;

    /** @var User $educatedUser */
    protected $educatedUser;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }

    /**
     * Get the value of educatedUser
     */ 
    public function getEducatedUser()
    {
        return $this->educatedUser;
    }

    /**
     * Set the value of educatedUser
     *
     * @return  self
     */ 
    public function setEducatedUser($educatedUser)
    {
        $this->educatedUser = $educatedUser;

        return $this;
    }
}