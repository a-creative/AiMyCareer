<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;

class Task implements Arrayable
{
    protected $id;
    protected $description;
    protected $weightPct;
    protected $performedInJobExperience;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }

    /**
     * Get the value of description
     */ 
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set the value of description
     *
     * @return  self
     */ 
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get the value of weightPct
     */ 
    public function getWeightPct()
    {
        return $this->weightPct;
    }

    /**
     * Set the value of weightPct
     *
     * @return  self
     */ 
    public function setWeightPct($weightPct)
    {
        $this->weightPct = $weightPct;

        return $this;
    }

    /**
     * Get the value of performedInJobExperience
     */ 
    public function getPerformedInJobExperience()
    {
        return $this->performedInJobExperience;
    }

    /**
     * Set the value of performedInJobExperience
     *
     * @return  self
     */ 
    public function setPerformedInJobExperience($performedInJobExperience)
    {
        $this->performedInJobExperience = $performedInJobExperience;

        return $this;
    }
}