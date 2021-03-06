<?php

$configPath = __DIR__ . '/apps/Admin/var/conf/';
$autoloadPath = __DIR__ . '/apps/Admin/bootstrap';
require($autoloadPath . '/autoload.php');
$prod = require($configPath . '/prod.php');
$dev = require($configPath . '/prod.php');
$test = require($configPath . '/test.php');

return [

    'paths' => [
        'migrations' => 'data/migrations'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_database' => 'development',
        'production' => [
            'adapter' => str_replace('pdo_', '', $prod['master_db']['driver']),
            'host' => $prod['master_db']['host'],
            'name' => $prod['master_db']['dbname'],
            'user' => $prod['master_db']['user'],
            'pass' => $prod['master_db']['password'],
            'port' => '3306'
        ],
        'development' => [
            'adapter' => str_replace('pdo_', '', $prod['master_db']['driver']),
            'host' => $prod['master_db']['host'],
            'name' => $prod['master_db']['dbname'],
            'user' => $prod['master_db']['user'],
            'pass' => $prod['master_db']['password'],
            'port' => '3306'
        ],
        'test' => [
            'adapter' => str_replace('pdo_', '', $test['master_db']['driver']),
            'host' => 'localhost',
            'name' => 'test_db',
            'user' => 'root',
        ]
    ]
];
