header("Content-Type:text/html;Charset=utf-8");
<?php
/*
	CKEditor_upload.php
	monkee
	2009-11-15	16:47
*/
$config=array();

$config['type']=array("flash","img");	//�ϴ�����typeֵ

$config['img']=array("jpg","bmp","gif");	//img�����׺
$config['flash']=array("flv","swf");	//flash�����׺

$config['flash_size']=200;	//�ϴ�flash��С���� ��λ��KB
$config['img_size']=500;	//�ϴ�img��С���� ��λ��KB

$config['message']="�ϴ��ɹ�";	//�ϴ��ɹ�����ʾ����Ϣ����Ϊ������ʾ

$config['name']=mktime();	//�ϴ�����ļ��������� ������unixʱ���������

$config['flash_dir']="/ckeditor/upload/flash";	//�ϴ�flash�ļ���ַ ���þ��Ե�ַ ����upload.php�ļ�����վ�ڵ��κ�λ�� ���治��"/"
$config['img_dir']="/ckeditor/upload/img";	//�ϴ�img�ļ���ַ ���þ��Ե�ַ ���þ��Ե�ַ ����upload.php�ļ�����վ�ڵ��κ�λ�� ���治��"/"

$config['site_url']="";	//��վ����ַ ����ͼƬ�ϴ���ĵ�ַ�й� ��󲻼�"/" ������

//�ļ��ϴ�
uploadfile();

function uploadfile()
{
	global $config;
	//�ж��Ƿ��ǷǷ�����
	if(empty($_GET['CKEditorFuncNum']))
		mkhtml(1,"","����Ĺ��ܵ�������");
	$fn=$_GET['CKEditorFuncNum'];
	if(!in_array($_GET['type'],$config['type']))
		mkhtml(1,"","������ļ���������");
	$type=$_GET['type'];
	if(is_uploaded_file($_FILES['upload']['tmp_name']))
	{
		//�ж��ϴ��ļ��Ƿ�����
		$filearr=pathinfo($_FILES['upload']['name']);
		$filetype=$filearr["extension"];
		if(!in_array($filetype,$config[$type]))
			mkhtml($fn,"","������ļ����ͣ�");
		//�ж��ļ���С�Ƿ����Ҫ��
		if($_FILES['upload']['size']>$config[$type."_size"]*1024)
			mkhtml($fn,"","�ϴ����ļ����ܳ���".$config[$type."_size"]."KB��");
		//$filearr=explode(".",$_FILES['upload']['name']);
		//$filetype=$filearr[count($filearr)-1];
		$file_abso=$config[$type."_dir"]."/".$config['name'].".".$filetype;
		$file_host=$_SERVER['DOCUMENT_ROOT'].$file_abso;
		
		if(move_uploaded_file($_FILES['upload']['tmp_name'],$file_host))
		{
			mkhtml($fn,$config['site_url'].$file_abso,$config['message']);
		}
		else
		{
			mkhtml($fn,"","�ļ��ϴ�ʧ�ܣ������ϴ�Ŀ¼���ú�Ŀ¼��дȨ��");
		}
	}
}
//���js����
function mkhtml($fn,$fileurl,$message)
{
	$str='<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('.$fn.', \''.$fileurl.'\', \''.$message.'\');</script>';
	exit($str);
}
?>
