<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201030110731 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE testimonials (id INT UNSIGNED AUTO_INCREMENT NOT NULL, about_job_experience_id INT UNSIGNED NOT NULL, summary_html LONGTEXT DEFAULT NULL, by_name VARCHAR(150) NOT NULL, contact_phone_no VARCHAR(20) DEFAULT NULL, contact_email VARCHAR(150) DEFAULT NULL, on_linked_in_profile VARCHAR(150) DEFAULT NULL, on_paper TINYINT(1) DEFAULT NULL, INDEX IDX_383115799E264A0E (about_job_experience_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE testimonials ADD CONSTRAINT FK_383115799E264A0E FOREIGN KEY (about_job_experience_id) REFERENCES job_experiences (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE testimonials');
    }
}
