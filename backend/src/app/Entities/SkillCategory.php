<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;

class SkillCategory implements Arrayable
{
    protected $id;
    protected $name;
    protected $icon;
    protected $foregroundColorHex;
    protected $backgroundColorHex;
    protected $usedInSkills;
    protected $ownerUser;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }
}