<?php

namespace App\Mappings;

use App\Entities\User;
use App\Entities\Skill;
use App\Entities\SkillCategory;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class SkillMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return Skill::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->increments('id');

        $builder->string('name')->length(150)->nullable(false);
        $builder->text('explainer')->nullable(true);
        $builder->unsignedSmallInteger('type')->nullable(false);

        $builder->manyToOne(SkillCategory::class, 'category');
        $builder->manyToOne(User::class, 'ownerUser');

    }


}