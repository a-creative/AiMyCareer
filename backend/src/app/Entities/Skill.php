<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;

class Skill implements Arrayable
{
    protected $id;
    protected $name;
    protected $explainer;
    protected $type;
    protected $category;
    protected $ownerUser;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }
}