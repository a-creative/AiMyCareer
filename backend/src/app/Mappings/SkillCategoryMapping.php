<?php

namespace App\Mappings;

use App\Entities\Skill;
use App\Entities\SkillCategory;
use App\Entities\User;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class SkillCategoryMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return SkillCategory::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->increments('id');

        $builder->string('name')->length(80)->nullable(false);
        $builder->string('icon')->length(50)->nullable(false);
        $builder->string('foregroundColorHex')->length(7)->nullable(false);
        $builder->string('backgroundColorHex')->length(7)->nullable(false);

        $builder->datetime('createdTime')->nullable();
        $builder->datetime('updatedTime')->nullable();

        $builder->hasMany( Skill::class, 'usedInSkills')->mappedBy('category');
        $builder->manyToOne(User::class, 'ownerUser');

    }

}