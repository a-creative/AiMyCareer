<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;

class TaskExpSkill implements Arrayable
{
    protected $usageWeightPct;
    protected $usedSkill;
    protected $usedWithTask;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }
}