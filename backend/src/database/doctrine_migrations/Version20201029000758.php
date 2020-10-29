<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201029000758 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE users CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL, CHANGE username email VARCHAR(80) NOT NULL');
        $this->addSql('ALTER TABLE job_postings ADD owner_user_id INT UNSIGNED NOT NULL, CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE job_postings ADD CONSTRAINT FK_B5F86DAB2B18554A FOREIGN KEY (owner_user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_B5F86DAB2B18554A ON job_postings (owner_user_id)');
        $this->addSql('DROP INDEX employer_jobtitle_idx ON job_postings');
        $this->addSql('CREATE UNIQUE INDEX job_postings_employer_job_title_unique ON job_postings (employer, job_title)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE job_postings DROP FOREIGN KEY FK_B5F86DAB2B18554A');
        $this->addSql('DROP INDEX IDX_B5F86DAB2B18554A ON job_postings');
        $this->addSql('ALTER TABLE job_postings DROP owner_user_id, CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('DROP INDEX job_postings_employer_job_title_unique ON job_postings');
        $this->addSql('CREATE UNIQUE INDEX employer_jobtitle_idx ON job_postings (employer, job_title)');
        $this->addSql('ALTER TABLE users CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE email username VARCHAR(80) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
