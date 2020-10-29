<?php

namespace App\Mappings;

use App\Entities\User;
use App\Entities\JobPosting;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class UserMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return User::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->increments('id');

        $builder->string('email')->length(80)->nullable(false);
        $builder->string('password')->length(80)->nullable(false);
        $builder->string('firstName')->length(80)->nullable();
        $builder->string('lastName')->length(80)->nullable();
        $builder->rememberToken();
        
        $builder->hasMany( JobPosting::class, 'jobPostings')->mappedBy('ownerUser');
    }


}