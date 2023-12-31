package com.cleanread.company.common.util.pattern.order;

import com.cleanread.company.model.response.PostDTO;
import org.springframework.data.domain.Page;

/**
 * @project: backend
 */
public interface OrderService {
    Page<PostDTO> getAllPosts();
}
