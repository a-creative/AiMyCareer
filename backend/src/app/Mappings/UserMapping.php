<?php

namespace App\Mappings;

use App\Entities\User;
use App\Entities\JobPosting;
use App\Entities\JobExperience;
use App\Entities\Education;
use App\Entities\Skill;
use App\Entities\SkillCategory;

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
        $builder->hasMany( JobExperience::class, 'jobExperiences')->mappedBy('ownerUser');
        $builder->hasMany( Education::class, 'educations')->mappedBy('educatedUser');
        $builder->hasMany( Skill::class, 'skills')->mappedBy('ownerUser');
        $builder->hasMany( SkillCategory::class, 'skillCategories')->mappedBy('ownerUser');
    
    }


}