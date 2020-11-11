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
    protected $createdTime;
    protected $updatedTime;

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

    /**
     * Get the value of createdTime
     */ 
    public function getCreatedTime()
    {
        return $this->createdTime;
    }

    /**
     * Set the value of createdTime
     *
     * @return  self
     */ 
    public function setCreatedTime($createdTime)
    {
        $this->createdTime = $createdTime;

        return $this;
    }

    /**
     * Get the value of updatedTime
     */ 
    public function getUpdatedTime()
    {
        return $this->updatedTime;
    }

    /**
     * Set the value of updatedTime
     *
     * @return  self
     */ 
    public function setUpdatedTime($updatedTime)
    {
        $this->updatedTime = $updatedTime;

        return $this;
    }
}