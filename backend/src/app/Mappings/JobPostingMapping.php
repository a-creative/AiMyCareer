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

        $builder->string('jobTitle')->name('job_title')->length(150)->nullable();
        $builder->string('employer')->length(150)->nullable();
        $builder->string('extLink')->name('ext_link')->length(500)->nullable();
        $builder->datetime('createdTime')->name('created_time')->nullable();
        $builder->datetime('updatedTime')->name('updated_time')->nullable();
        $builder->date('postedDate')->name('posted_date')->nullable();
        $builder->date('deadlineDate')->name('deadline_date')->nullable();
        $builder->string('locationPostalCode')->name('location_postal_code')->length(10)->nullable();
        $builder->string('locationCity')->name('location_city')->length(150)->nullable();
        $builder->string('contactName')->name('contact_name')->length(150)->nullable();
        $builder->string('contactJobTitle')->name('contact_job_title')->length(150)->nullable();
        $builder->string('contactDetails')->name('contact_details')->length(500)->nullable();
        $builder->text('contentRaw')->name('content_raw')->nullable();
                    
        $builder->manyToOne(User::class, 'ownerUser');

    }


}