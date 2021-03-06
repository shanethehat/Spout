<?php
/**
 * This file is part of the Mackstar.Spout
 *
 * @license http://opensource.org/licenses/bsd-license.php BSD
 */
namespace Mackstar\Spout\Provide\Validations;

use Fuel\Validation\Validator as ValidatorClass;
use Mackstar\Spout\Interfaces\ValidatorProviderInterface;

/**
 * Mackstar.Spout
 *
 * @package Mackstar.Spout
 */
class ValidatorProvider implements ValidatorProviderInterface
{
    private $validatorClasses = [
        'Between',
        'Date',
        'EmailAddress',
        'LessThan',
        'NotEmpty',
        'StringLength',
        'Uri',
        'Ip'
    ];

    public function get()
    {
        $validators = [];
        $validatorNamespace = 'Zend\\Validator\\';
        foreach ($this->validatorClasses as $className) {
            $fullClassName = $validatorNamespace . $className;
            $validators[strtolower($className)] = new $fullClassName();
        }
        return $validators;
    }
}
