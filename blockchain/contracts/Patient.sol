pragma solidity ^0.4.4;

contract Patient {

  Patient[] public patient;

  struct Patient {
    bytes32 firstName;
    bytes32 lastName;
    uint age;
  }

  event patientAdded(bytes32 indexed _firstName, bytes32 indexed _lastName, uint indexed _age);

  function addPatient(bytes32 _firstName, bytes32 _lastName, uint _age) returns (bool success) {
    Patient memory newPatient;
    newPatient.firstName = _firstName;
    newPatient.lastName = _lastName;
    newPatient.age = _age;

    patient.push(newPatient);
    patientAdded(newPatient.firstName, newPatient.lastName, newPatient.age);
    return true;

  }

  function getPatient() constant returns (bytes32[],bytes32[],uint[]) {

    uint length = patient.length;

    bytes32[] memory firstNames = new bytes32[](length);
    bytes32[] memory lastNames = new bytes32[](length);
    uint[] memory ages = new uint[](length);

    for (uint i = 0; i < patient.length; i ++) {
      Patient memory currentPatient;
      currentPatient = patient[i];

      firstNames[i] = currentPatient.firstName;
      lastNames[i] = currentPatient.lastName;
      ages[i] = currentPatient.age;
    }

    return (firstNames,lastNames,ages);

  }

}
