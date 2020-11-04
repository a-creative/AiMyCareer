<?php

namespace App\Mappings;

use App\Entities\Task;
use App\Entities\JobExperience;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class TaskMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return Task::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->increments('id');

        $builder->text('description')->nullable(false);
        $builder->unsignedSmallInteger('weightPct')->nullable(false);

        $builder->manyToOne(JobExperience::class, 'performedInJobExperience')->inversedBy('performedTasks');
        
    }


}