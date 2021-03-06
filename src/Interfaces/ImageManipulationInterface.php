<?php
/**
 * This file is part of the Mackstar.Spout
 *
 * @license http://opensource.org/licenses/bsd-license.php BSD
 */
namespace Mackstar\Spout\Interfaces;

/**
 * Mackstar.Spout
 *
 * @package Mackstar.Spout
 */
interface ImageManipulationInterface
{
    public function resize($source, $target, $width, $height);
}
