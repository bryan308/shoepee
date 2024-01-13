<?php
//prod.manage.php

session_start();

include_once(__DIR__ . "/../connections/connection.php");
include_once(__DIR__ . "/../connections/head.php");
$con = connection();


if (!isset($_SESSION['UserLogin']))
{
    header("Location: ../admin/auth.admin.php");
    exit();
}

$success = $_SESSION['status'] ?? NULL;
$id = $_SESSION['id'] ?? NULL;

if ($id) {
    $userSql = "SELECT * FROM tbl_admins WHERE id = ?";
    $stmtUser = $con->prepare($userSql);
    $stmtUser->bind_param("i", $id);
    $stmtUser->execute();
    $user = $stmtUser->get_result()->fetch_assoc();

    $search = isset($_GET['querysearch']) ? $_GET['querysearch'] : '';
    $filter = isset($_GET['queryfilter']) ? $_GET['queryfilter'] : '';
    
    if ($search && $filter) {
        $prodSql = "SELECT * FROM tbl_products WHERE product_archive = 'FALSE' AND brand LIKE '%$filter' AND model_name LIKE '%$search%' ORDER BY RAND()";
    } elseif ($search && empty($filter)) {
        $prodSql = "SELECT * FROM tbl_products WHERE product_archive = 'FALSE' AND model_name LIKE '%$search%' ORDER BY RAND()";
    } elseif (empty($search) && $filter) {
        $prodSql = "SELECT * FROM tbl_products WHERE product_archive = 'FALSE' AND brand LIKE '%$filter%' ORDER BY RAND()";
    } else {
        $prodSql = "SELECT * FROM tbl_products WHERE product_archive = 'FALSE' ORDER BY RAND()";
    }
    
    $products = ($con->query($prodSql)->num_rows > 0) ? $con->query($prodSql)->fetch_all(MYSQLI_ASSOC) : [];
}

if (isset($_POST["done-success"]))
{
    unset($_SESSION['status']);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php echo $headContent; ?>
    <title>SHOEPEE | MANAGE PRODUCTS</title>
</head>

<body>
    <div class="overlay"></div>

    <nav>
        <div class="logo">
            <div class="logo-icon">
                <img src="../assets/images/shoepee_logo.png" alt="">
            </div>
            <div class="logo-text">
                <p>SHOEPEE</p>
            </div>
        </div>
        <button class="toggle-nav-menu">
            <span class="material-symbols-outlined">right_panel_open</span>
        </button>
        <?php if (isset($_SESSION['UserLogin'])) { ?>
            <?php if ($_SESSION['access'] === 'admin') { ?>
                <div class="nav-menu-container" type="mobile">
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="../products/prod.manage.php" class="nav-links" title="All Products">
                                <span class="material-symbols-outlined">view_cozy</span> All Products
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../products/prod.add.php" class="nav-links" title="Add Products">
                                <span class="material-symbols-outlined">library_add</span> Add Item
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../products/prod.archive.list.php" class="nav-links" title="Archived Products">
                                <span class="material-symbols-outlined">archive</span> Archived Products
                            </a>
                        </li>
                    </ul>
                    <div class="account-section" title="Admin Account">
                        <div class="user-account">
                            <div class="account-icon">
                                <span class="material-symbols-outlined">shield_person</span>
                            </div>
                            <div class="account-name">
                                <p>
                                    <?php echo $user['username']; ?>
                                </p>
                            </div>
                        </div>
                        <div class="account-action">
                            <a class="log-out" href="../auth/signout.php" target="_self">
                                <span class="material-symbols-outlined">logout</span>Log out
                            </a>
                        </div>
                    </div>
                </div>
            <?php } else {
                header("Location: ../auth/signin.php");
            } ?>
        <?php } ?>
        <div class="nav-menu-container" type="desktop">
            <ul class="nav-menu">
                <?php if (isset($_SESSION['UserLogin'])) { ?>
                    <?php if ($_SESSION['access'] === 'admin') { ?>
                        <li class="nav-item nav-item-search">
                            <form action="" method="GET">
                                <!-- <label><span class="material-symbols-outlined">search</span>  -->
                                <label>Search
                                    <input type="search" name="querysearch" id="" class="search-input" pattern="[a-zA-Z0-9_\d.\s]*|[1-9][0-9]*" maxlength="30" minlength="" autocomplete="off" value="<?php echo $search; ?>">
                                </label>    
                            </form>
                        </li>
                        <li class="nav-item">
                            <a href="../products/prod.manage.php" class="nav-links" title="All Products">
                                <span class="material-symbols-outlined">view_cozy</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../products/prod.add.php" class="nav-links" title="Add Item">
                                <span class="material-symbols-outlined">library_add</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../products/prod.archive.list.php" class="nav-links" title="Archived Products">
                                <span class="material-symbols-outlined">archive</span>
                            </a>
                        </li>
                        <li class="nav-item account" title="Admin Account">
                            <div class="account-icon">
                                <?php if (!empty($user['profile_img'])) { ?>
                                    <img src="../assets/images/users/<?php echo $user['profile_img']; ?>" alt="">
                                <?php } else { ?>
                                    <span class="material-symbols-outlined">shield_person</span>
                                <?php } ?>
                            </div>
                            <div class="account-name">
                                <p>
                                    <?php echo $user['username']; ?>
                                </p>
                            </div>
                        </li>
                    <?php } else { ?>
                        <?php header("Location: ../auth/signin.php"); ?>
                    <?php } ?>
                <?php } else { ?>
                    <li class="nav-item">
                        <span class="material-symbols-outlined no-account">shield_person</span>
                    </li>
                <?php } ?>
                <?php if (isset($_SESSION['UserLogin'])) { ?>
                    <?php if ($_SESSION['access'] === 'admin') { ?>
                        <div class="account-link-container" card-type="with-account">
                            <div class="account-link">
                                <a href="../auth/signout.php" class="nav-links" target="_self">
                                    Log out
                                </a>
                            </div>
                        </div>
                    <?php } ?>
                <?php } else { ?>
                    <div class="account-link-container" card-type="no-account">
                        <div class="account-link">
                            <a href="../auth/signin.php" class="nav-links" target="_self">
                                Sign In
                            </a>
                        </div>
                    </div>
                <?php } ?>
            </ul>
        </div>
    </nav>
    <!-- <div id="confirmDialog" class="confirm-dialog" <?php echo !empty($success) ? 'style="display: block;"' : 'style="display: none;"' ; ?>>
        <div class="delete-title" style="display: flex; gap: 5px;">
            <h3>SUCCESS!</h3>
        </div>
            <p><?php if (isset($_SESSION["status"])) {echo $success;} ?></p>
        <form class="btn-wrapper" action="" method= "POST">
            <button class="" name="done-success" type="submit">Proceed</button>
        </form>
    </div> -->
    <div class="grid-wrapper" animate="fadeIn">
        <?php foreach ($products as $product): ?>
            <div class="prod-card">
                <div class="brand-icon">
                    <?php if ($product['brand'] === 'Nike') { ?>
                        <img class="brand-icon-img" src="../assets/images/src/brand_logos/Nike_logo.png"
                            alt="<?php echo $product['brand']; ?> logo">
                    <?php } else if ($product['brand'] === 'Adidas') { ?>
                            <img class="brand-icon-img" src="../assets/images/src/brand_logos/Adidas_logo.png"
                                alt="<?php echo $product['brand']; ?> logo">
                    <?php } ?>
                </div>
                <img class="prod-img" src="../assets/uploads/<?php echo $product['img_url']; ?>"
                    alt="<?php echo $product['model_name']; ?>">
                <div class="prod-card-description">
                    <h4>
                        <?php echo $product['brand']; ?>
                        <?php echo $product['model_name']; ?>
                    </h4>
                    <p>
                        <?php echo "Stock: " . $product['stock_quantity']; ?>
                    </p>
                </div>
                <a href="../products/prod.edit.php?prod_id=<?php echo $product['prod_id'] ?>"></a>
            </div>
        <?php endforeach; ?>
    </div>
</body>
<script type="module" src="../assets/JS/script.js"></script>
<script type="module" src="../assets/JS/nav.js"></script>

</html>