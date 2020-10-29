<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201029215443 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE skill_categories ADD owner_user_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE skill_categories ADD CONSTRAINT FK_2F7A9A1A2B18554A FOREIGN KEY (owner_user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_2F7A9A1A2B18554A ON skill_categories (owner_user_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE skill_categories DROP FOREIGN KEY FK_2F7A9A1A2B18554A');
        $this->addSql('DROP INDEX IDX_2F7A9A1A2B18554A ON skill_categories');
        $this->addSql('ALTER TABLE skill_categories DROP owner_user_id');
    }
}
