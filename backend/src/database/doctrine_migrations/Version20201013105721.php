<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201013105721 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE job_postings ADD created_time DATETIME DEFAULT NULL, ADD updated_time DATETIME DEFAULT NULL, ADD posted_date DATE DEFAULT NULL, ADD deadline_date DATE DEFAULT NULL, ADD location_postal_code VARCHAR(10) DEFAULT NULL, ADD contact_name VARCHAR(150) DEFAULT NULL, ADD contact_job_title VARCHAR(150) DEFAULT NULL, ADD contact_details VARCHAR(500) DEFAULT NULL, ADD content_raw LONGTEXT DEFAULT NULL, CHANGE job_title job_title VARCHAR(150) DEFAULT NULL, CHANGE employer employer VARCHAR(150) DEFAULT NULL, CHANGE ext_link ext_link VARCHAR(500) DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX employer_jobtitle_idx ON job_postings (employer, job_title)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP INDEX employer_jobtitle_idx ON job_postings');
        $this->addSql('ALTER TABLE job_postings DROP created_time, DROP updated_time, DROP posted_date, DROP deadline_date, DROP location_postal_code, DROP contact_name, DROP contact_job_title, DROP contact_details, DROP content_raw, CHANGE job_title job_title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE employer employer VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE ext_link ext_link VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
