<?php

namespace App\Mappings;

use App\Entities\User;
use App\Entities\JobPosting;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class JobPostingMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return JobPosting::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->unique(['employer','job_title']);

        $builder->increments('id');

        $builder->string('jobTitle')->length(150)->nullable();
        $builder->string('employer')->length(150)->nullable();
        $builder->string('extLink')->length(500)->nullable();
        $builder->datetime('createdTime')->nullable();
        $builder->datetime('updatedTime')->nullable();
        $builder->date('postedDate')->nullable();
        $builder->date('deadlineDate')->nullable();
        $builder->string('locationPostalCode')->length(10)->nullable();
        $builder->string('locationCity')->length(150)->nullable();
        $builder->string('contactName')->length(150)->nullable();
        $builder->string('contactJobTitle')->length(150)->nullable();
        $builder->string('contactDetails')->length(500)->nullable();
        $builder->text('contentRaw')->nullable();
                    
        $builder->manyToOne(User::class, 'ownerUser');

    }


}