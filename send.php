<?php

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;

require __DIR__ . '/vendor/autoload.php';
require "./config.php";



try{
$transport = Transport::fromDsn(MAILER_DSN);
$mailer = new Mailer($transport); 

if(!empty($_POST)){

    /**
     * Creation d'un nom unique pour stocker les images
     */
    $file= md5(uniqid()).".png";
    /*var_dump($file);*/

    $data= trim(strip_tags($_POST["image"]));

    // var_dump($_POST);

    list(, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);

    file_put_contents(__DIR__."/image/".$file, $data);
    $email = (new Email())

        ->from(trim(strip_tags($_POST["story"])))
        ->to(trim(strip_tags($_POST["storyr"])))
        ->cc(trim(strip_tags($_POST["storyr"])))
        ->priority(Email::PRIORITY_HIGHEST)
        ->subject('My first mail using Symfony Mailer')
        ->text(trim(strip_tags($_POST["storyz"])))
        ->html('<p>'.trim(strip_tags($_POST["storyz"])).'</p><img src='.trim(strip_tags($_POST["image"])).' alt="Un canvas surprise">');
    
    $mailer->send($email);

    echo json_encode(["succes" => "Formulaire envoyé"]);

}

    //TODO try catch

}catch(Exception $e){
    echo json_encode(["error" => $e->getMessage()]);
}





