<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;
use App\Entities\User;

class JobExperience implements Arrayable
{

    protected $id;
    protected $jobTitle;
    protected $employer;
    protected $startedDate;
    protected $endedDate;
    protected $createdTime;
    protected $updatedTime;
    protected $performedTasks;

    /**
     * The User that owns that has this job experience
     *
     * @var User
     */
    protected $ownerUser;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of jobTitle
     */ 
    public function getJobTitle()
    {
        return $this->jobTitle;
    }

    /**
     * Set the value of jobTitle
     *
     * @return  self
     */ 
    public function setJobTitle($jobTitle)
    {
        $this->jobTitle = $jobTitle;

        return $this;
    }

    /**
     * Get the value of employer
     */ 
    public function getEmployer()
    {
        return $this->employer;
    }

    /**
     * Set the value of employer
     *
     * @return  self
     */ 
    public function setEmployer($employer)
    {
        $this->employer = $employer;

        return $this;
    }

    /**
     * Get the value of startedDate
     */ 
    public function getStartedDate()
    {
        return $this->startedDate;
    }

    /**
     * Set the value of startedDate
     *
     * @return  self
     */ 
    public function setStartedDate($startedDate)
    {
        $this->startedDate = $startedDate;

        return $this;
    }

    /**
     * Get the value of endedDate
     */ 
    public function getEndedDate()
    {
        return $this->endedDate;
    }

    /**
     * Set the value of endedDate
     *
     * @return  self
     */ 
    public function setEndedDate($endedDate)
    {
        $this->endedDate = $endedDate;

        return $this;
    }

    /**
     * Get the User that owns that has this job experience
     *
     * @return  User
     */ 
    public function getOwnerUser()
    {
        return $this->ownerUser;
    }

    /**
     * Set the User that owns that has this job experience
     *
     * @param  User  $ownerUser  The User that owns that has this job experience
     *
     * @return  self
     */ 
    public function setOwnerUser(User $ownerUser)
    {
        $this->ownerUser = $ownerUser;

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