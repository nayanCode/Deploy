pragma solidity >=0.4.22;

contract Storedata {
    address public owner = msg.sender;

    struct TranscriptDetails {
       string id;
       string fullname;
       string yearofpassing;
       string deparmentName;
       string IPFSurl;  
       string Filehash;
    }
    event Dataadded (
        string id,
        string fullname,
        string yearofpassing,
        string deparmentName,
        string IPFSurl,
        string Filehash
    );

mapping(string => mapping(uint => TranscriptDetails)) public studentStorage;
mapping(string => uint) public transcriptCount;

 constructor () public{
AddDetails("10191602023","Nayan Shingare","2023","Computer","0xe332d43ftjukif4r4rmsw","0xe332d43ftjukif4r4rmsw");
    }

     function AddDetails(string memory id,string memory fullname,string memory yearofpassing,string memory deparmentName,string memory IPFSurl,string memory Filehash) public {
        uint transcriptCnt = transcriptCount[id];
        studentStorage[id][transcriptCnt] = TranscriptDetails(id, fullname, yearofpassing,deparmentName,IPFSurl,Filehash);
         emit Dataadded(id,fullname, yearofpassing,deparmentName,IPFSurl,Filehash);
        transcriptCount[id]++;

    }

 

     
}
