<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201029215307 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE skills ADD owner_user_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE skills ADD CONSTRAINT FK_D53116702B18554A FOREIGN KEY (owner_user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_D53116702B18554A ON skills (owner_user_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE skills DROP FOREIGN KEY FK_D53116702B18554A');
        $this->addSql('DROP INDEX IDX_D53116702B18554A ON skills');
        $this->addSql('ALTER TABLE skills DROP owner_user_id');
    }
}
