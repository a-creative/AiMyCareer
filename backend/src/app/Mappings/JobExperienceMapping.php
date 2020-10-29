<?php

namespace App\Mappings;

use App\Entities\User;
use App\Entities\JobExperience;
use App\Entities\Task;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class JobExperienceMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return JobExperience::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->increments('id');

        $builder->string('jobTitle')->length(150)->nullable();
        $builder->string('employer')->length(150)->nullable();

        $builder->date('startedDate')->nullable();
        $builder->date('endedDate')->nullable();

        $builder->datetime('createdTime')->nullable();
        $builder->datetime('updatedTime')->nullable();
    
        $builder->manyToOne(User::class, 'ownerUser');
        $builder->hasMany(Task::class, 'performedTasks')->mappedBy('performedInJobExperience');

    }


}