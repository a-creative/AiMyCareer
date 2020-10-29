<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201029214140 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE education_exp_skills (learned_skill_id INT UNSIGNED NOT NULL, learned_at_education_id INT UNSIGNED NOT NULL, learning_weight_pct SMALLINT UNSIGNED NOT NULL, started_date DATE DEFAULT NULL, ended_date DATE DEFAULT NULL, INDEX IDX_DFFD8EBF6DBBF808 (learned_skill_id), INDEX IDX_DFFD8EBF4EDB9213 (learned_at_education_id), PRIMARY KEY(learned_skill_id, learned_at_education_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE education (id INT UNSIGNED AUTO_INCREMENT NOT NULL, name VARCHAR(150) NOT NULL, description LONGTEXT DEFAULT NULL, started_date DATE NOT NULL, ended_date DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill_categories (id INT UNSIGNED AUTO_INCREMENT NOT NULL, name VARCHAR(80) NOT NULL, icon VARCHAR(50) NOT NULL, foreground_color_hex VARCHAR(7) NOT NULL, background_color_hex VARCHAR(7) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skills (id INT UNSIGNED AUTO_INCREMENT NOT NULL, category_id INT UNSIGNED NOT NULL, name VARCHAR(150) NOT NULL, explainer LONGTEXT DEFAULT NULL, type SMALLINT UNSIGNED NOT NULL, INDEX IDX_D531167012469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE task_exp_skills (used_skill_id INT UNSIGNED NOT NULL, used_with_task_id INT UNSIGNED NOT NULL, usage_weight_pct SMALLINT UNSIGNED NOT NULL, INDEX IDX_9E12323D9FB8D4ED (used_skill_id), INDEX IDX_9E12323D9AE734BD (used_with_task_id), PRIMARY KEY(used_skill_id, used_with_task_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tasks (id INT UNSIGNED AUTO_INCREMENT NOT NULL, description LONGTEXT NOT NULL, weight_pct SMALLINT UNSIGNED NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE education_exp_skills ADD CONSTRAINT FK_DFFD8EBF6DBBF808 FOREIGN KEY (learned_skill_id) REFERENCES skills (id)');
        $this->addSql('ALTER TABLE education_exp_skills ADD CONSTRAINT FK_DFFD8EBF4EDB9213 FOREIGN KEY (learned_at_education_id) REFERENCES education (id)');
        $this->addSql('ALTER TABLE skills ADD CONSTRAINT FK_D531167012469DE2 FOREIGN KEY (category_id) REFERENCES skill_categories (id)');
        $this->addSql('ALTER TABLE task_exp_skills ADD CONSTRAINT FK_9E12323D9FB8D4ED FOREIGN KEY (used_skill_id) REFERENCES skills (id)');
        $this->addSql('ALTER TABLE task_exp_skills ADD CONSTRAINT FK_9E12323D9AE734BD FOREIGN KEY (used_with_task_id) REFERENCES tasks (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE education_exp_skills DROP FOREIGN KEY FK_DFFD8EBF4EDB9213');
        $this->addSql('ALTER TABLE skills DROP FOREIGN KEY FK_D531167012469DE2');
        $this->addSql('ALTER TABLE education_exp_skills DROP FOREIGN KEY FK_DFFD8EBF6DBBF808');
        $this->addSql('ALTER TABLE task_exp_skills DROP FOREIGN KEY FK_9E12323D9FB8D4ED');
        $this->addSql('ALTER TABLE task_exp_skills DROP FOREIGN KEY FK_9E12323D9AE734BD');
        $this->addSql('DROP TABLE education_exp_skills');
        $this->addSql('DROP TABLE education');
        $this->addSql('DROP TABLE skill_categories');
        $this->addSql('DROP TABLE skills');
        $this->addSql('DROP TABLE task_exp_skills');
        $this->addSql('DROP TABLE tasks');
    }
}
